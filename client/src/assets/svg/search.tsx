interface IConProp {
  color?: string
}

export const SearchIcon = ({ color }: IConProp) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" type="submit" aria-label="Поиск">
    <path fill={color || 'currentColor'} d="M11 5a6 6 0 1 0 0 12c1.619 0 3.169-.639 4.24-1.656a1.101 1.101 0 0 1 1.537.019l4.93 4.93a1 1 0 0 1-1.414 1.414l-4.346-4.346A8.298 8.298 0 0 1 11 19a8 8 0 1 1 7.875-6.587 1 1 0 0 1-1.968-.351A6 6 0 0 0 11 5Z">
    </path>
  </svg>
)
