import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an AI-powered chef that helps users create delicious recipes based on the ingredients they have. Given a list of ingredients, suggest a recipe that creatively incorporates some or all of them while giving detailed instructions with headings. Main headings should be in #(markdown). You may add a few additional ingredients if necessary, but keep them minimal and commonly available. Ensure the recipe is easy to follow and well-structured. Format your response in markdown to make it easier to render to a web page
`

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return (response.choices[0].message.content) 
    } catch (err) {
        console.error(err.message)
    }
}

// getRecipeFromMistral(["Chicken,Oregano,Bread,Potato,Onions"])

