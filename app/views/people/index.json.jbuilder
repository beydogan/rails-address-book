json.array!(@people) do |person|
  json.extract! person, :id, :name, :surname, :address
  json.url person_url(person, format: :json)
end
