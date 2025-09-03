
import crypto from "crypto"

export const genarateOtp = ({ length = 6 }: { length: number }) => {

    const otp = crypto.randomInt(0, Math.pow(10, length))
        .toString()
        .padStart(length, "0");

    return otp;

}



