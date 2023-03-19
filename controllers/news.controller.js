const model = require("../models");
const { User, UserDetail, Category, Country, News } = model;

require("dotenv").config();
const jwt = require("jsonwebtoken");
const imgbbUploader = require("imgbb-uploader");
const { sequelize } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getAllNewsByUser: async (req, res) => {
    const auth = await req.headers.authorization;
    if (auth) {
      const token = await auth.split(" ")[1];

      const verified = jwt.verify(token, process.env.JWTKEY);

      if (verified) {
        const news = await News.findAll({
          where: {
            userId: verified.id,
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password"],
              },
              include: [UserDetail],
            },
            {
              model: Country,
            },
            {
              model: Category,
            },
          ],
        });

        res.status(200).json(news);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Token Required" });
    }
  },

  createNewsByUser: async (req, res) => {
    const auth = await req.headers.authorization;
    if (auth) {
      const token = await auth.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWTKEY);

      if (verified) {
        const uploaded_image = await req.file;

        if (uploaded_image == null) {
          res.status(422).json({ message: "Missing Image Value" });
        } else {
          const name_uploaded_image =
            (await uploaded_image.originalname.split(".")[0]) +
            "-" +
            new Date().getTime();

          const options = {
            apiKey: process.env.IMGBBKEY,
            name: name_uploaded_image,
            base64string: uploaded_image.buffer.toString("base64"),
          };

          const response = await imgbbUploader(options).then((res) => {
            return res.url;
          });

          const data = await req.body;

          await News.create({
            title: data.title,
            content: data.content,
            summary: data.summary,
            image: response,
            isPublished: false,
            total_like: 0,
            countryId: verified.countryId,
            categoryId: data.categoryId,
            userId: verified.id,
          });

          res.status(201).json({ message: "News created" });
        }
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Token Required" });
    }
  },

  getNewsById: async (req, res) => {
    const id = await req.params.id;
    const news = await News.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
          include: [UserDetail],
        },
        {
          model: Country,
        },
        {
          model: Category,
        },
      ],
    });

    if (news) {
      res.status(200).json(news);
    } else {
      res.status(401).json({ message: "News not found" });
    }
  },

  updateNewsByIdUser: async (req, res) => {
    const auth = await req.headers.authorization;
    if (auth) {
      const id = await req.params.id;
      const token = await auth.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWTKEY);

      if (verified) {
        const news = await News.findByPk(id);

        if (news.userId == verified.id) {
          const uploaded_image = await req.file;

          const data = await req.body;
          let image = await news.image;

          if (uploaded_image) {
            const name_uploaded_image =
              (await uploaded_image.originalname.split(".")[0]) +
              "-" +
              new Date().getTime();

            const options = {
              apiKey: process.env.IMGBBKEY,
              name: name_uploaded_image,
              base64string: uploaded_image.buffer.toString("base64"),
            };

            let image = await imgbbUploader(options).then((res) => {
              return res.url;
            });
          }

          await News.update(
            {
              title: data.title,
              content: data.content,
              summary: data.summary,
              image: image,
              categoryId: data.categoryId,
            },
            {
              where: {
                id: id,
              },
            }
          );

          res.status(201).json({ message: "News updated" });

          // if (uploaded_image == null) {
          //   res.status(422).json({ message: "Missing Image Value" });
          // } else {
          //   const name_uploaded_image =
          //     (await uploaded_image.originalname.split(".")[0]) +
          //     "-" +
          //     new Date().getTime();

          //   const options = {
          //     apiKey: process.env.IMGBBKEY,
          //     name: name_uploaded_image,
          //     base64string: uploaded_image.buffer.toString("base64"),
          //   };

          //   const response = await imgbbUploader(options).then((res) => {
          //     return res.url;
          //   });

          //   const data = await req.body;

          //   await News.update(
          //     {
          //       title: data.title,
          //       content: data.content,
          //       summary: data.summary,
          //       image: response,
          //       categoryId: data.categoryId,
          //     },
          //     {
          //       where: {
          //         id: id,
          //       },
          //     }
          //   );

          //   res.status(201).json({ message: "News updated" });
          // }
        } else {
          res.status(401).json({ message: "Creator only" });
        }
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Token Required" });
    }
  },

  deleteNewsByIdUser: async (req, res) => {
    const auth = await req.headers.authorization;
    if (auth) {
      const id = await req.params.id;
      const token = await auth.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWTKEY);

      if (verified) {
        const news = await News.findByPk(id);

        if (news.userId == verified.id || verified.isAdmin == true) {
          await News.destroy({
            where: {
              id: id,
            },
          });

          res.status(201).json({ message: "News deleted" });
        } else {
          res.status(401).json({ message: "Creator and Admin only" });
        }
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Token Required" });
    }
  },

  getNeedProceedNews: async (req, res) => {
    const auth = await req.headers.authorization;
    if (auth) {
      const token = await auth.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWTKEY);

      if (verified && verified.isAdmin == true) {
        const news = await News.findAll({
          where: {
            isPublished: false,
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password"],
              },
              include: [UserDetail],
            },
            {
              model: Country,
            },
            {
              model: Category,
            },
          ],
        });

        res.status(200).json(news);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Token Required" });
    }
  },

  putNeedProceedNews: async (req, res) => {
    const auth = await req.headers.authorization;
    if (auth) {
      const id = req.params.id;
      const token = await auth.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWTKEY);

      if (verified && verified.isAdmin == true) {
        await News.update(
          {
            isPublished: true,
          },
          {
            where: {
              id: id,
            },
          }
        );

        res.status(200).json({ message: "News Published" });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Token Required" });
    }
  },

  getProceededNews: async (req, res) => {
    const auth = await req.headers.authorization;
    if (auth) {
      const token = await auth.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWTKEY);

      if (verified && verified.isAdmin == true) {
        const news = await News.findAll({
          where: {
            isPublished: true,
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password"],
              },
              include: [UserDetail],
            },
            {
              model: Country,
            },
            {
              model: Category,
            },
          ],
        });

        res.status(200).json(news);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Token Required" });
    }
  },

  putProceededNews: async (req, res) => {
    const auth = await req.headers.authorization;
    if (auth) {
      const id = req.params.id;
      const token = await auth.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWTKEY);

      if (verified && verified.isAdmin == true) {
        await News.update(
          {
            isPublished: false,
          },
          {
            where: {
              id: id,
            },
          }
        );

        res.status(200).json({ message: "News Unpublished" });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Token Required" });
    }
  },

  getAllNews: async (req, res) => {
    const news = await News.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        isPublished: true,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
          include: [UserDetail],
        },
        {
          model: Country,
        },
        {
          model: Category,
        },
      ],
    });

    res.status(200).json(news);
  },

  getAllNewsByCountry: async (req, res) => {
    const id = await req.params.id;

    const news = await News.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        isPublished: true,
        countryId: id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
          include: [UserDetail],
        },
        {
          model: Country,
        },
        {
          model: Category,
        },
      ],
    });

    res.status(200).json(news);
  },

  getAllNewsByCategory: async (req, res) => {
    const id = await req.params.id;

    const news = await News.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        isPublished: true,
        categoryId: id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
          include: [UserDetail],
        },
        {
          model: Country,
        },
        {
          model: Category,
        },
      ],
    });

    res.status(200).json(news);
  },

  getAllNewsByTrend: async (req, res) => {
    const news = await News.findAll({
      order: [["total_like", "DESC"]],
      where: {
        isPublished: true,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
          include: [UserDetail],
        },
        {
          model: Country,
        },
        {
          model: Category,
        },
      ],
    });

    res.status(200).json(news);
  },

  addLikeToNews: async (req, res) => {
    const auth = req.headers.authorization;
    if (auth) {
      const id = req.params.id;
      const token = await auth.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWTKEY);

      if (verified) {
        await News.update(
          {
            total_like: sequelize.literal("total_like + 1"),
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).json({ message: "News liked" });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Token Required" });
    }
  },

  //  addLikeToNews = async (req, res) => {
  //     const auth = req.headers.authorization;
  //     if (auth) {
  //       const id = req.params.id;
  //       const token = auth.split(" ")[1];
  //       const verified = jwt.verify(token, process.env.JWTKEY);
  //       if (verified) {
  //         const news = await News.findOne({ where: { id } });
  //         if (news) {
  //           let newTotalLike = news.total_like;
  //           if (req.body.like) {
  //             if (!news.likes.includes(verified.id)) { // if user hasn't already liked this article
  //               newTotalLike++;
  //               await news.update({ likes: [...news.likes, verified.id], total_like: newTotalLike }); // add user's id to likes array and increment total_like
  //               res.status(200).json({ message: "News liked" });
  //             } else { // if user has already liked this article
  //               res.status(400).json({ message: "You have already liked this article" });
  //             }
  //           } else { // if unlike button clicked
  //             if (news.likes.includes(verified.id)) { // if user has already liked this article
  //               newTotalLike--;
  //               const newLikes = news.likes.filter(like => like !== verified.id); // remove user's id from likes array
  //               await news.update({ likes: newLikes, total_like: newTotalLike }); // update likes array and total_like
  //               res.status(200).json({ message: "News unliked" });
  //             } else { // if user hasn't liked this article yet
  //               res.status(400).json({ message: "You haven't liked this article yet" });
  //             }
  //           }
  //         } else {
  //           res.status(404).json({ message: "News not found" });
  //         }
  //       } else {
  //         res.status(401).json({ message: "Unauthorized" });
  //       }
  //     } else {
  //       res.status(401).json({ message: "Token Required" });
  //     }
  //   },

  searchNewsByTitle: async (req, res) => {
    const title = req.query.title;

    const news = await News.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        isPublished: true,
        title: {
          [Op.like]: "%" + title + "%",
        },
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
          include: [UserDetail],
        },
        {
          model: Country,
        },
        {
          model: Category,
        },
      ],
    });

    res.status(200).json(news);
  },
};
