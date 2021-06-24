import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, admin, password } = request.body;

    const userService = new CreateUserService();

    const user = userService.execute({ email, name, admin, password });

    return response.json(user);
  }
}

export { CreateUserController };
