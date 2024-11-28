import { PetsModel } from "../model/pet.model.js";

const findAll = async (req, res) => {
  let { limit = 5, page = 1 } = req.query;
  limit = Number(limit);
  page = Number(page);

  try {
    const count = await PetsModel.count();
    const pets = await PetsModel.findAllPets({ limit, page });

    if (!pets) {
      return res.status(400).json({
        ok: false,
        message: "Not exists pets, please register one pet",
      });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}/api/v1/pets`;
    const baseUrlWithQueries = `${baseUrl}?limit=${limit}`;

    const totalPages = Math.ceil(count / limit);
    const nextPage =
      page + 1 > totalPages ? null : `${baseUrlWithQueries}&page=${page + 1}`;

    const prevPage =
      page - 1 < 1 ? null : `${baseUrlWithQueries}&page=${page - 1}`;

    return res.status(200).json({
      pagination: {
        count,
        totalPages,
        nextPage,
        prevPage,
        currentPage: page,
        limit,
      },
      pets,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const PetController = {
  findAll,
};
