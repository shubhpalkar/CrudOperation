import { createParamDecorator } from "@nestjs/common";

export const Cookies = createParamDecorator((data, req) => {
    return data ? req.cookies && req.cookies[data] : req.cookies;
    
  });
