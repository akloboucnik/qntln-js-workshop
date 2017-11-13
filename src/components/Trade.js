import React from 'react';

export default ({ trade_id, price, size, side }) => (
    <div className={`container trade ${side}`}>
        {size}@{price}
    </div>
)
