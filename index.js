// global datastore
let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delv => delv.neighborhoodId === this.id)
  }
  customers() {
    return store.customers.filter(cust => cust.neighborhoodId === this.id)
  }
  meals() {
    const total = this.deliveries().map(delv => delv.meal())
    return Array.from(new Set(total))
  }
}
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(deliv => deliv.mealId === this.id)
  }
  customers() {
    return this.deliveries().map(deliv => deliv.customer())
  }
  static byPrice() {
    return store.meals.sort((meal1, meal2) => meal1.price < meal2.price)
  }
}
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(deliv => deliv.customerId === this.id)
  }
  meals() {
    return this.deliveries().map(delv => delv.meal())
  }
  totalSpent() {
    return this.meals().reduce((p, meal) => p + meal.price, 0)
  }
}
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }
  customer() {
    return store.customers.find(cust => cust.id === this.customerId)
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}
