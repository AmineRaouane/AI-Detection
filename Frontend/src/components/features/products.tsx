import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { products } from "@/components/data/products";
import AI1 from "@/components/data/images/AI1.jpg";
import AI2 from "@/components/data/images/AI2.jpg";
import AI3 from "@/components/data/images/AI3.jpg";
import AI4 from "@/components/data/images/AI4.jpg";

const images =  [AI1, AI2, AI3, AI4];

export function Products() {
  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-normal overflow-visible">
          Our Products
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include our core
          detection features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 md:grid-rows-2 gap-8">
        {products.map((product, index) => (
          <CardContainer className="inter-var">
            <CardBody className="bg-inherit relative group/card shadow-2xl hover:shadow-emerald-500/[0.5] w-auto sm:w-[35rem] h-auto rounded-xl p-6 border border-purple-500/20 backdrop-blur-lg hover:border-purple-500 transition-all duration-300"
            >
              <CardItem translateZ="50" className="flex items-center gap-5">
                <product.logo size={48} />
                <span className="text-xl font-bold text-neutral-600 dark:text-white">
                  {product.title}
                </span>
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm w-full mt-2 dark:text-neutral-300"
              >
                {product.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src={images[index]}
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="Product thumbnail"
                />
              </CardItem>

              {/* Footer Buttons */}
              <div className="flex justify-between items-center mt-4">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold w-full"
                >
                  Try for Free
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
