const Category = require('../models/categoryModel');
const sanitize = require('mongo-sanitize');

exports.createCategory = (req, res, next) => {
  const category = new Category({
    name: req.body.name,
  });
  category.save().then(
    () => {
      res.status(201).json({
        message: 'Catégorie créé'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneCategory = (req, res, next) => {

  // The sanitize function will strip out any keys that start with '$' in the input,
  // so you can pass it to MongoDB without worrying about malicious users overwriting
  // query selectors.
  const cleanId = sanitize(req.params.id);

  Category.findOne({
    _id: cleanId
  }).then(
    (category) => {
      res.status(200).json(category);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyCategory = (req, res, next) => {
  const category = new Category({
    _id: req.params.id,
    name: req.body.name,
  });
  Category.updateOne({_id: req.params.id}, category).then(
    () => {
      res.status(201).json({
        message: 'catégorie modifiée'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteCategory = (req, res, next) => {
  Category.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'catégorie supprimée'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllCategory = (req, res, next) => {
  Category.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getTable = (req, res, next) => {
   Category.find().then(
     (things) => {
      res.status(200).json({message : getCategoryTable(things)});
     }
   ).catch(
     (error) => {
       res.status(400).json({
         error: error
       });
     }
   );
  };
function getCategoryTable(things) {

  body = '';
        console.log('thingstable')
        things.forEach(element => {
            body += '<tr>'
            body +=	'<td>'+element.name+'</td>'
            body +='<td><div class="dropdown dropleft">';
			body +='	<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">';
			body +='		 ';
			body +='	</button>';
			body +='	<div class="dropdown-menu">';
			body +='<a class="dropdown-item" onclick="update_category(\''+element._id+'\')"href="#" >Modifier</a>';
			body +='<a class="dropdown-item" onclick="delete_category(\''+element.name+'\',\''+element._id+'\')"href="#" >Supprimer</a>';
			body +='	</div>';
			body +='</div></td></tr>';
        });
        
        html = '<table  id="table_id" class="display" style="width:100%">'
        html +=	'		<thead>'
        html +=	'				<tr>'
        html +=	'					<th>Nom</th><th>Action</th>'
        html +=	'				</tr>'
        html +=	'			</thead>'
        html +=	'			<tbody>'
        html +=	      body
        html +=	'			</tbody>'
        html +=	'			</table>';
        console.log(html)
        return(html);

      }