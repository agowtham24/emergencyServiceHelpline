import { Request, Response } from "express";
import { ServiceModel } from "../schemas/services";
import fs from "fs";
import path from "path";

export const createService = async (req: Request, res: Response) => {
  try {
    let body = {
      ...req.body,
    };
    if (req.file) {
      body.image = req.file.filename;
    }
    const existingService = await ServiceModel.findOne({
      email: req.body.email,
    });
    if (existingService) {
      return res.status(400).json({ error: "Service already exists" });
    }
    const service = new ServiceModel(body);
    await service.save();
    res.status(201).json({ message: "Service created successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await ServiceModel.find();
    res.json(services);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getService = async (req: Request, res: Response) => {
  try {
    const service = await ServiceModel.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    let body = {
      ...req.body,
    };
    if (req.file) {
      body.image = req.file.filename;
    }

    const service = await ServiceModel.findByIdAndUpdate(req.params.id, body);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // unlink the old image
    if (req.file && service.image) {
      fs.unlinkSync(path.join("static/serviceImages", service.image));
    }

    res.json({ message: "Service updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await ServiceModel.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    if (service.image) {
      fs.unlinkSync(path.join("static/serviceImages", service.image));
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getServicesByType = async (req: Request, res: Response) => {
  try {
    const services = await ServiceModel.find({ serviceType: req.params.type });
    res.json(services);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getServicesByLocation = async (req: Request, res: Response) => {
  try {
    const keyword = req.params.location;
    const services = await ServiceModel.aggregate([
      {
        $match: {
          location: {
            $regex: keyword,
            $options: "i",
          },
        },
      },
    ]);

    res.json(services);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
