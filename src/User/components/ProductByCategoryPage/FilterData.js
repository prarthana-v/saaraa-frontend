const multiplefilters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "black", label: "Black", checked: false },
      { value: "blue", label: "Blue", checked: false },
      { value: "red", label: "Red", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "yellow", label: "Yellow", checked: false },
    ],
  },
  {
    id: "price-range",
    name: "Price Range",
    options: [
      { value: "under-50", label: "Under $50", checked: false },
      { value: "50-100", label: "$50 - $100", checked: false },
      { value: "100-200", label: "$100 - $200", checked: false },
      { value: "200-500", label: "$200 - $500", checked: false },
      { value: "over-500", label: "Over $500", checked: false },
    ],
  },
  {
    id: "occasion",
    name: "Occasion",
    options: [
      { value: "casual", label: "Casual", checked: false },
      { value: "formal", label: "Formal", checked: false },
      { value: "party", label: "Party", checked: false },
      { value: "wedding", label: "Wedding", checked: false },
      { value: "vacation", label: "Vacation", checked: false },
    ],
  },
  {
    id: "size-fit",
    name: "Size & Fit",
    options: [
      { value: "small", label: "Small", checked: false },
      { value: "medium", label: "Medium", checked: false },
      { value: "large", label: "Large", checked: false },
      { value: "x-large", label: "X-Large", checked: false },
      { value: "xx-large", label: "XX-Large", checked: false },
    ],
  },
  {
    id: "tags",
    name: "Tags",
    options: [
      { value: "best-seller", label: "Best Seller", checked: false },
      { value: "new-arrival", label: "New Arrival", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "limited-edition", label: "Limited Edition", checked: false },
      { value: "exclusive", label: "Exclusive", checked: false },
    ],
  },
];

const singlefilter = [
  {
    id: "ratings",
    name: "Ratings",
    options: [
      { value: "1", label: "1 Star & Above", checked: false },
      { value: "2", label: "2 Stars & Above", checked: false },
      { value: "3", label: "3 Stars & Above", checked: false },
      { value: "4", label: "4 Stars & Above", checked: false },
      { value: "5", label: "5 Stars Only", checked: false },
    ],
  },
];
export { multiplefilters, singlefilter };
