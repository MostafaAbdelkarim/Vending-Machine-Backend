
const handleError = (err,req,res,next) => {
  res.status(err.statusCode || 500).send({ 
    timestamp: new Date(), 
    statusCode: err.statusCode || 500, 
    message: err.message || 'Internal Server Error', 
    status: err.status 
  });
};

module.exports = {handleError};