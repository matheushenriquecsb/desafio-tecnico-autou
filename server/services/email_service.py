from server.utils.nlp_utils import preprocess_text, classifier
from server.utils.file_utils import read_pdf, read_txt
from fastapi import UploadFile 
 
def classify_and_reply(text: str): 
 
    labels = ["Produtivo (relacionado a trabalho, tarefas ou problemas)", 
              "Improdutivo (mensagem social, sem relação com trabalho)"]

    processed = preprocess_text(text)
 
    result = classifier(
        processed,
        candidate_labels=labels,
        hypothesis_template="Esse email é {}.",
        truncation=True
    )   
 
    category = result["labels"][0]
     
    if category == "Produtivo":
        reply = (
            "Olá, recebemos seu email e confirmamos o recebimento. "
            "Sua solicitação será analisada e tratada em breve."
        )
    else:
        reply = (
            "Olá, agradecemos sua mensagem. "
            "Não é necessário retorno, mas ficamos à disposição."
        )

    return category, reply

async def extract_text_from_file(file: UploadFile) -> str:
    if file.filename.endswith(".txt"):
        return await read_txt(file)
    elif file.filename.endswith(".pdf"):
        return await read_pdf(file)
    else:
        raise ValueError("Formato de arquivo não suportado")