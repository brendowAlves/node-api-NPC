import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";
import { SurveysRepository } from "./SurveysRepository";

@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {}

export {SurveysUsersRepository}