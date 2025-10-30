import { NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI();

export async function POST(request) {
  try {
    const { topic, noq, difficalty, langauge } = await request.json();
    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: `
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
    `,
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
