'use strict';

class Validation {

    constructor(criteria) {
        this.criteriaWithState = criteria.map(value => {
            return {
                state: true,
                criterion: value
            }
        });
        this.counter = 1;
    }

    toggleValidator(name, state) {
        this.counter++;
        this.criteriaWithState.forEach(criterionWithState => {
            if (criterionWithState.criterion.name === name) {
                criterionWithState.state = state !== undefined ? state : this.counter % 2 === 0;
            }
        });
    }

    validate(value) {
        let isValidAll = true;
        let map = new Map();
        let switchOnCriteria = this.criteriaWithState.filter(criterionWithState => {
            return criterionWithState.state;
        });
        switchOnCriteria.forEach(criterionWithState => {
            let isValid = criterionWithState.criterion.check(value);
            if (!isValid) {
                map.set(criterionWithState.criterion.name, criterionWithState.criterion.message());
            }

            isValidAll = isValidAll && isValid;
        });

        return {
            valid: isValidAll,
            errors: map
        }
    }
}

let criteria = [
    {
        name: 'required',
        check: value => {
            return value !== null;
        },
        message: value => {
            return 'Заполните поле';
        }
    },
    {
        name: 'length',
        check: value => {
            return value !== null && value.length >= 6;
        },
        message: value => {
            return 'Значение меньше 6 символов';
        }
    }
];
