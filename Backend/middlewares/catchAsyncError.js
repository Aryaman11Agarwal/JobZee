const catchAysncError=(func)=>{
	return (req,res,next)=>{
		Promise.resolve(func(req,res,next)).catch(next);
	}
}

module.exports=catchAysncError;