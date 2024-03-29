import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";
import { Repository, getRepository } from "typeorm";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {user_id},
      relations: ['car']
    })
    return rentals
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne(id)
    return rental
  }
  
  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    const openByCar = await this.repository.findOne({
      where: {car_id, end_date: null}
    })
    return openByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    const openByUser = await this.repository.findOne({
      where: {user_id, end_date: null}
    })
    return openByUser
  }
  
  async create({car_id, spected_return_date, user_id, id, end_date, total}: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id, spected_return_date, user_id, id, end_date, total
    })
    await this.repository.save(rental)
    return rental
  }
}

export {RentalsRepository}