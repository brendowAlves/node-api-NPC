import { response } from "express"

import {Request, Response} from 'express'
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";
import {resolve} from 'path'


class SendEmailController{

async execute (request: Request, response: Response){
    const {email, survey_id} = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const userExisted = await userRepository.findOne({
        email,
    })

    const surveyExisted = await surveyRepository.findOne({
        id: survey_id
    });

    if(!userExisted){
        return await response.status(400).json({
            error: "User does not exits",
        })
    }

      if(!surveyExisted){
        return response.status(400).json({
            error: "Survey does not exits!"
        })
    }
   
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const variables ={
        name: userExisted.name,
        title: surveyExisted.title,
        description: surveyExisted.description,
        user_id: userExisted.id,
        link: process.env.URL_MAIL
    }

    const surveyUserExits = await surveyUserRepository.findOne({
        where:[{user_id : userExisted.id}, {value: null}],
        relations: ["user", "survey" ]
    })

    console.log(surveyExisted);

    if(surveyUserExits){
       await SendMailService.execute(email, surveyExisted.title, variables, npsPath);
       return response.json(surveyUserExits);
    }

    // Salvar as informações na tabela surveyUser
    const surveyUser = surveyUserRepository.create({
        user_id: userExisted.id,
        survey_id
    });


    await  surveyUserRepository.save(surveyUser);

    // Enviar e-mail para o usuário.


    await SendMailService.execute(email, surveyExisted.title, variables, npsPath);
    return response.json(surveyUser);
}

}
export {SendEmailController}