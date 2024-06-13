> [!IMPORTANT]
> # Custom Functions
> For Response
``` javascript
import { Response } from 'express';
type Tdata<T> = {
  success: boolean;
  message: string;
  data: T;
};
export const sendResponse = <T>(res: Response, result: Tdata<T>) => {
  return res.status(200).json({
    success: result.success,
    message: result.message,
    data: result.data,
  });
};
```
  
