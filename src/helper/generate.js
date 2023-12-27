import jwt from "jsonwebtoken"

const newToken = () =>{
    const token = Math.random().toString(32).slice(2,8).toUpperCase()
    return token;
}

const newJsonToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: "30d",
    })
}


export {
    newToken,
    newJsonToken
}