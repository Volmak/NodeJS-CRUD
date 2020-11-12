module.exports = {
    Products:
    [
        {
            "id": 1,
            "name": "Apple",
            "category": "Fruit",
            "price": "1"
        },
        {
            "id": 2,
            "name": "Milk",
            "category": "Diary",
            "price": "2.50"
        }
    ],

    Orders:
    [
        {
            "id": 1,
            "date": "2018-05-29",
            "products": [1, 2],
            "status": "Delivered"
        },
        {
            "id": 2,
            "date": "2018-05-30",
            "products": [1],
            "status": "Pending"
        }
    ]
}