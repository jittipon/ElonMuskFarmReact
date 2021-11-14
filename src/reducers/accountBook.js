import {
    SHOW_ACCOUNT_BOOK,
    SHOW_SUM_INCOME_OUTCOME,
    ADD_ACCOUNT_BOOK,
    UPDATE_ACCOUNT_BOOK,
    DELETE_ACCOUNT_BOOK
} from '../actions/type';

const initialState = [];

function accountBookReducer(accountBook = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SHOW_ACCOUNT_BOOK:
            return payload;
        case SHOW_SUM_INCOME_OUTCOME:
            return payload;
        case ADD_ACCOUNT_BOOK:
            return [...accountBook, payload];
        case UPDATE_ACCOUNT_BOOK:
            return accountBook.map((accountList) => {
                if (accountList === payload.id) {
                    return {
                        ...accountList,
                        ...payload,
                    }
                } else {
                    return accountList;
                }
            });
        case DELETE_ACCOUNT_BOOK:
            return accountBook.filter(({ id }) => id !== payload.id);
        default:
            return accountBook;
    }
};

export default accountBookReducer;