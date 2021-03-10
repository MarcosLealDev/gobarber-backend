import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmensRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmensRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmensRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmensRepository);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create 2 appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
