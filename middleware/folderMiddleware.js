export const setFolderUser = (req, res, next) => {
    const user = req.user.name;
    if (req.file) {
      req.body.folder = "img-users";
      req.body.user = user
    }
    next();
  };

export const setFolderOwner = (req, res, next) => {
    const owner = req.owner.name;
    console.log(owner);
    if (req.file) {
      req.body.folder = "img-owners";
      req.body.owner = owner
    }
    next();
  };
  
export const setFolderLaundry = (req, res, next) => {
    const laundry = req.laundry.id
    if (req.file) {
      req.body.folder = "img-laundry";
      req.body.user = laundry
    }
    next();
  };
  