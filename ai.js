// Environment variables are automatically loaded by Vite

const SYSTEM_PROMPT = `
You are an AI-powered chef that helps users create delicious recipes based on the ingredients they have. Given a list of ingredients, suggest a recipe that creatively incorporates some or all of them while giving detailed instructions with headings. Main headings should be in #(markdown). You may add a few additional ingredients if necessary, but keep them minimal and commonly available. Ensure the recipe is easy to follow and well-structured. Format your response in markdown to make it easier to render to a web page
`

// Use import.meta.env for Vite (web app)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    
    // Add debug info
    console.log('Using Gemini API key:', GEMINI_API_KEY ? 'Key present' : 'No key found')
    // console.log('Ingredients:', ingredientsString)
    
    try {
        const prompt = `${SYSTEM_PROMPT}\n\nI have these ingredients: ${ingredientsString}. Please give me a recipe you'd recommend I make!`
        
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        }
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        
        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            const generatedText = data.candidates[0].content.parts[0].text
            // console.log('Success with Gemini!')
            return generatedText
        } else {
            throw new Error('Unexpected response format from Gemini API')
        }
        
    } catch (err) {
        console.error('Gemini API failed:', err.message)
        console.error('Full error:', err)
        
        // Fallback response
        return err.message
    }
}

// getRecipeFromMistral(["Chicken,Oregano,Bread,Potato,Onions"]).then(recipe => {
//     console.log('\n--- Generated Recipe ---')
//     console.log(recipe)
//     console.log('--- End Recipe ---\n')
// })

