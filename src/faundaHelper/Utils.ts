/**
 *Utils
 * Created by mac on 30/03/21
 * Joao Sumbo
 */

export default class Utils {
    static generateRef(): string{
        const date = new Date();
        return `${date.getUTCDay()}${date.getHours()}${date.getMonth()}${date.getTime()}`;
    }
}