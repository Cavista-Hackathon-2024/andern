const config = require("../config")
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} = require("@google/generative-ai");


// const openAI = new OpenAI(config.openai)

class AI{
    constructor(){
        const safetySettings = [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },{
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            }
          ];
        this.getSafetySettings = () =>({safetySettings})
        this.ai = new GoogleGenerativeAI(config.gemini.apiKey)

        this.exec = async function(prompt, imageFile=undefined){
            const model = this.ai.getGenerativeModel({ model: "gemini-pro", ...this.getSafetySettings()});
            let image;

            if(imageFile){
                const filePath = path.resolve(__dirname, `../uploads/${imageFile.filename}`)
                image = {
                    inlineData: {
                      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
                      mimeType: imageFile.mimetype,
                    },
                  };
            }
            
            const result = await model.generateContent(!image?prompt: [prompt, image]);
            const response = await result.response;
            const text = response.text();
            return text
        }
    }




    async medicalAssistant(){
        const prompt = `You are an assistant for medical personnels and will assist in diagnosis analysis and giving your insights based on questions asked by a medical personnel, probably a doctor or pharmacy mostly`
        const aiRes = await this.exec(prompt)

        return statesArr.split(",")
    }

    async userAssistant(){
        const prompt = `You are an assistant for paients giving break down and analysis of their symptom, and all healthcare related questions and not forgetting to emphasis the importance of seeking medical personnel`
        return this.exec(prompt)
    }


}

const aiService = new AI()

module.exports = Object.freeze(aiService)