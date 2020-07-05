import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

const CategoriesMb = ({ categories }) => {
  return (
    <>
      <div className="bg-success mb-n2">
        <h1 className="text-white h4 p-2">
          <i className="fas fa-bars fa-xs ml-2 mr-3" />
          Categories
        </h1>
      </div>
      {categories.length > 0 &&
        categories.map(({ category, subcategories }) => (
          <Accordion allowZeroExpanded={true} key={category.id}>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <a href={'/productList/' + category.id} className="accordion__link">
                    {category.category_name}
                  </a>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="row no-border-radius">
                  {subcategories.length > 0 &&
                    subcategories.map(({ category, lastChilds }) => (
                      <div className="col-md-4 col-6" key={category.id}>
                        <h1 className="h6">
                          <a href={'/productList/' + category.id} className="accordion__link">
                            {category.category_name}
                          </a>
                        </h1>
                        <ul className="ml-3 mt-n1">
                          {lastChilds.length > 0 &&
                            lastChilds.map((category) => (
                              <li key={category.id}>
                                <a href={'/productList/' + category.id} className="accordion__link">
                                  {category.category_name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        ))}
    </>
  );
};

export default CategoriesMb;
