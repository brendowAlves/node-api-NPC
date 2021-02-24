import express from 'express';

const app = express();

/**
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Aletração especifica
 */

//http://localhost:3333/users
 app.get("/", (resquest, response) => {
    //  return response.send("Hello World - NLW04")
    return response.json({message: "Hello World - NLW04"})
 })


 // 1 parms => Rota(Recurso API)
 // 2 params => request, response
 app.post("/", (resquest, response) =>{ 
    //Recebeu =>  resques,response
    return response.json({message: "Os dados foram salvos com sucesso!"})

 })
app.listen(3333,() =>  console.log("Server is running"))