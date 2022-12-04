const model = require("../models");
require("dotenv").config();

const { User, UserDetail } = model;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const imgbbUploader = require("imgbb-uploader");


module.exports = {
  register: async (req, res) => {
    const uploaded_image = await req.file;
    const name_uploaded_image =
      uploaded_image.originalname.split(".")[0] + "-" + new Date().getTime();

    const options = {
      apiKey: process.env.IMGBBKEY,
      name: name_uploaded_image,
      base64string: uploaded_image.buffer.toString("base64"),
    };

    const response = await imgbbUploader(options).then((res) => {
      return res.url;
    });

    const data = await req.body;
    const saltRounds = 10;

    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash;

    await User.create(
      {
        email: data.email,
        password: data.password,
        isAdmin: false,
        UserDetail: {
          fullName: data.fullName,
          image: response,
          countryId: data.countryId,
        },
      },
      {
        include: [UserDetail],
      }
    );
    res.status(201).json({ message: "Account Created" });
  },

  login: async (req, res) => {
    try {
      const data = await req.body;

      const userData = await User.findOne({
        include: [UserDetail],
        where: {
          email: data.email,
        },
      });

      if (userData) {
        const check = bcrypt.compareSync(data.password, userData.password);

        if (check) {
          const token = jwt.sign(
            {
              id: userData.id,
              email: userData.email,
              fullName: userData.UserDetail.fullName,
              image: userData.UserDetail.image,
              countryId: userData.UserDetail.countryId,
              isAdmin: userData.isAdmin,
            },
            process.env.JWTKEY,
            { expiresIn: "1d" }
          );

          res.status(201).json({
            message: "Login Success",
            token,
          });
        } else {
          res.status(401).json({
            message: "Password does not match",
          });
        }
      } else {
        res.status(401).json({
          message: "Email is not registered",
        });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};
