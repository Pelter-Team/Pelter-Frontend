import React from "react"

interface BasicProps {
  setName: React.Dispatch<React.SetStateAction<string>>
  setAnimal: React.Dispatch<React.SetStateAction<string>>
  setBreed: React.Dispatch<React.SetStateAction<string>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  setHealth: React.Dispatch<React.SetStateAction<string>>
  setResource: React.Dispatch<React.SetStateAction<string>>
}

export default function BasicInfo({
  setName,
  setAnimal,
  setBreed,
  setDescription,
  setHealth,
  setResource,
}: BasicProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="text-xl font-bold">Basic Information</div>
      <form className="bg-transparent w-full h-fit p-4 border border-black rounded-md mt-3 gap-3 flex flex-col min-h-[30rem]">
        <div className="flex flex-row gap-4">
          <div className="w-44">
            <label htmlFor="Name" className="text-base flex flex-row mb-1">
              <span className="text-red-600">＊</span>Name
            </label>
            <input
              type="text"
              id="Name"
              className="w-full h-10 text-sm rounded-lg  border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2 bg-mainBG"
              placeholder="AiDum, etc."
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex flex-row mt-1 items-center gap-1 justify-between">
              <div>
                <input
                  type="radio"
                  id="cat"
                  name="animal"
                  value="Cat"
                  className="w-4 h-4 accent-primary mr-2"
                  onChange={(e) => setAnimal(e.target.value)}
                />
                <label htmlFor="cat">Cat</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="dog"
                  name="animal"
                  value="Dog"
                  onChange={(e) => setAnimal(e.target.value)}
                  className="ml-2 w-4 h-4 accent-primary mr-2"
                />
                <label htmlFor="dog">Dog</label>
              </div>
            </div>
          </div>

          <div className="w-44">
            <label
              htmlFor="Breed"
              className="text-base flex flex-row gap-1 mb-1"
            >
              Breed<span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              id="Breed"
              className="w-full h-10 text-sm rounded-lg  border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2 bg-mainBG"
              placeholder="Mixed, Mutt, Moggie, etc."
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="Description" className="text-base flex flex-row mb-1">
            <span className="text-red-600">＊</span>Description
          </label>
          <textarea
            id="Description"
            className="resize-y p-2 w-full h-32 text-sm rounded-lg  border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2 bg-mainBG"
            placeholder="Big ears, etc."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="Health"
            className="text-base flex flex-row gap-1 mb-1"
          >
            Health Conditions
            <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            id="Health"
            className="w-full h-10 text-sm rounded-lg  border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2 bg-mainBG"
            placeholder="Allergies, Coughing, Diarrhea, etc."
            onChange={(e) => setHealth(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="Resource"
            className="text-base flex flex-row gap-1 mb-1"
          >
            Resource<span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            id="Resource"
            className="w-full h-10 text-sm rounded-lg  border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2 bg-mainBG"
            placeholder="Bangkok, etc."
            onChange={(e) => setResource(e.target.value)}
          />
        </div>
      </form>
    </div>
  )
}
