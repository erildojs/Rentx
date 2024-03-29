import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoriesInMemory implements ICategoriesRepository {
  categories: Category[] = []

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()
    Object.assign(category, {
      name, description
    })
    this.categories.push(category)
  }
  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find((category) => category.name === name)
    return category
  }
  async list(): Promise<Category[]> {
    const list = this.categories
    return list
  }
}

export {CategoriesRepositoriesInMemory}