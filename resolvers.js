import Exchange from './models/exchange.js';
export const resolvers = {
    Query: {
        async getExchangeRate(root, { src, tgt }) {
            //최신일자의 환율을 응답
            const exchange = await Exchange.findOne({ src, tgt }).sort({ date: -1 });
            if (!exchange) {
                console.log("데이터를 찾을 수 없습니다");
            }
            return exchange;
        }
    },

    Mutation: {
        async postExchangeRate(root, { info }) {
            const { src, tgt, rate, date } = info;

            //src와 tgt의 값이 같을 때 환율을 1로 설정
            const exchangeRate = src === tgt ? 1 : rate;
            //날짜 값이 안들어왔을 때 현재 날짜로 저장
            const currentDate = date ? date.split("T")[0] : new Date().toISOString().split("T")[0];
            const a = await Exchange.create({ src, tgt, rate: exchangeRate, date: currentDate });
            // 반대의 경우도 동시에 저장
            if (src !== tgt) {
                const reverseExchangeRate = await Exchange.create({ src: tgt, tgt: src, rate: 1 / exchangeRate, date: currentDate });
                const sameExchangeRate = await Exchange.create( {src, tgt: src, rate: 1, date: currentDate})
            }
            return a;
        },

        async deleteExchangeRate(root, { info }) {
            const { src, tgt, date } = info;
            const exchange = await Exchange.findOneAndDelete({ src, tgt, date });
            if (!exchange) {
                console.log("데이터를 찾을 수 없습니다");
            }
            return exchange;
        }
    }
}