export default async function generate(prompt) {
    var response = await chat(prompt);
    return response; 
}   

async function chat(prompt) { 
    try {
        const myHeaders = new Headers();

        /*
            TODO: Save the api-key in the environment variable
         */
        myHeaders.append("api-key", "fFbmnS8siJxaUXrwvYNp");
        myHeaders.append("Content-Type", "application/json");
    
        const rawBody = JSON.stringify({
          messages: [
            {
              content: "You are a Word Assistant, response to the user's prompt in markdown format.",
              role: "system",
            },
            {
              content: prompt,
              role: "user",
            },
          ],
          model: "InnovationGPT35-16",
        });
        const url = "https://llm-api-stk.azurewebsites.net/chat/completions";
        const response = await fetch(url, { 
          method: "POST",
          headers: myHeaders,
          body: rawBody,
          redirect: "follow",
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const result = await response.json();
        
        if (result.choices && result.choices[0] && result.choices[0].message) {
          return result.choices[0].message.content;
        }
  
      } catch (error) {
        console.error(error);
      }

}