const ErrorHandler = (req,res,next) => {
    const bundle  = res.locals.bundle

    if(bundle.errors){
        const errors = parseErrors(bundle.errors)
        res.status(500).json({errors})
    }else{
        next()
    }
}


const parseErrors = (ndErrors) => {
    let errors =  []

    for(let error in ndErrors){
        console.log(error)
        errors.push(error)
    }

    return errors
}

module.exports = ErrorHandler