import { NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI();

export async function POST(request) {
  try {
    const { topic, noq, difficalty, langauge, type } = await request.json();

    const systemPromptNormal = `
      System:
          You are a quiz generator. Output MUST be a single JSON object ONLY. Do not include any text, explanations, or markdown outside the JSON.

          User:
          Generate a multiple-choice quiz according to these strict rules:

          1. OUTPUT:
            - Return exactly one JSON object with keys: "html", "answers", "topic", "difficulty".
            - No extra whitespace, no commentary, nothing outside the JSON.

          2. HTML RULES:
            - "html" value must be a valid JSON string containing an <ol> with exactly N <li> items.
            - Each <li> must contain:
              a) the question text (plain text or HTML entities) followed by a single <br>.
              b) Four answer choices. Each choice must be:
                  <input type="radio" id="q{qIndex}_{choiceIndex}" name="q{qIndex}" value="{1|2|3|4"><label for="q{qIndex}_{choiceIndex}">CHOICE TEXT</label>
                  Example: <input type="radio" id="q1_2" name="q1" value="2"><label for="q1_2">49π หน่วย^2</label>
              c) The id must match pattern: q<questionNumber>_<choiceNumber> (e.g., q3_1). questionNumber starts at 1.
            - No <script>, no <style>, no inline event handlers, no extra wrapper tags outside the required <ol>.

          3. ANSWERS:
            - Provide "answers" object mapping question name to string of the correct choice value, e.g. "q1":"2".

          4. METADATA:
            - "topic": single short string (the quiz topic).
            - "difficulty": "easy" | "medium" | "hard"

          5. FORMATTING:
            - Use valid JSON escaping for all quotes inside "html".
            - Do not include correct answers inside the HTML.

          6. EXAMPLE (exact format you must follow):
          {
            "html": "<ol><li>What is 2+2?<br><input type=\"radio\" id=\"q1_1\" name=\"q1\" value=\"1\"><label for=\"q1_1\">3</label><input type=\"radio\" id=\"q1_2\" name=\"q1\" value=\"2\"><label for=\"q1_2\">4</label><input type=\"radio\" id=\"q1_3\" name=\"q1\" value=\"3\"><label for=\"q1_3\">5</label><input type=\"radio\" id=\"q1_4\" name=\"q1\" value=\"4\"><label for=\"q1_4\">6</label></li></ol>",
            "answers": { "q1": "2" },
            "topic": "Math",
            "difficulty": "easy"
          }

          Generate N questions:
          - Topic: ${topic}
          - Number of questions: ${noq}
          - Difficulty: ${difficalty}
          - Language: ${langauge}

          Return only the JSON object.
    `;

    const systemPromptSpecial = `
    System:
      You are a professional Thai exam quiz formatter.
      Your task is to find publicly available questions for a given Thai exam topic from multiple online sources.
      Do NOT create new questions yourself. Only use real questions found online.
      Output MUST be a single JSON object ONLY. No commentary, no extra text.

      User:
      Generate a multiple-choice quiz for the topic: ${topic}

      Rules:
      1. OUTPUT KEYS:
        - "html": quiz content in HTML format
        - "answers": object of correct answers
        - "topic": quiz topic
        - "sources": array of URLs or website names where questions were found

      2. HTML RULES (must match normal exam exactly):
        - "html" value must be a valid JSON string containing <ol> with exactly N <li> items.
        - Each <li> must contain:
            a) The question text (plain text or HTML entities) followed by a single <br>.
            b) Four answer choices. Each choice must be:
                <input type="radio" id="q{qIndex}_{choiceIndex}" name="q{qIndex}" value="{1|2|3|4}">
                <label for="q{qIndex}_{choiceIndex}">CHOICE TEXT</label>
            c) The id/name pattern must exactly match: q1_1, q1_2, q2_1, etc.
        - No <script>, <style>, <p>, <div>, or extra wrapper tags.

      3. ANSWERS:
        - "answers" object maps question name to string of the correct choice value, e.g. "q1": "2".

      4. SOURCES:
        - "sources" must list all websites or URLs where the questions originated.

      5. METADATA:
        - "topic": short string with exam name (e.g. “TGAT 2 การคิดอย่างมีเหตุผล”)

      6. FORMAT:
        - Output must be valid JSON with correct escaping for quotes inside "html".
        - Do not include difficulty or commentary.

`;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: type === "normal-exam" ? systemPromptNormal : systemPromptSpecial,
    });

    return NextResponse.json({
      data: response.output_text,
      usage: response.usage.total_tokens,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
