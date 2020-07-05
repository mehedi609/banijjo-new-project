import React from 'react';
import { fetcher } from 'utils/fetcher';
import BaseLayout from 'components/layout/base-layout';

const MoreCategory = ({ categories }) => {
  return (
    <BaseLayout>
      <div className="container mt-3">
        {categories.length > 0 &&
          categories.map(({ category, subcategories }) => (
            <div className="row" key={category.id}>
              <div className="col-12">
                <div className="card rounded-0 mb-3 pl-3 pt-2">
                  <h1 className="h3">
                    <a href="#!" className="accordion__link">
                      {category.category_name}
                    </a>
                  </h1>

                  <div className="row pl-3">
                    {subcategories.length > 0 &&
                      subcategories.map(({ category, lastChilds }) => (
                        <div className="col-lg-3 col-md-4 col-6">
                          <h1 className="h6">
                            <a href="#!" className="accordion__link">
                              {category.category_name}
                            </a>
                          </h1>
                          <ul className="ml-3 mt-n1">
                            {lastChilds.length > 0 &&
                              lastChilds.map((category) => (
                                <li>
                                  <a href="#!" className="accordion__link">
                                    {'- '}
                                    {category.category_name}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async ({ params }) => {
  const base = process.env.FRONTEND_SERVER_URL;
  const res = await fetcher(`${base}/api/all_category_list`);

  const categories = res.data;

  return {
    props: { categories },
  };
};

export default MoreCategory;
