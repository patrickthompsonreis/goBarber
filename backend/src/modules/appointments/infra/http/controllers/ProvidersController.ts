import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const parsedDate = parseISO(date);

    const listProviders = container.resolve(ListProvidersService);

    const appointment = await listProviders.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}
