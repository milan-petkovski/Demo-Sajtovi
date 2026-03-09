import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import appetizerImg from '@/assets/appetizer.jpg';
import mainCourseImg from '@/assets/main-course.jpg';
import dessertImg from '@/assets/dessert.jpg';

const menuData = {
  predjela: {
    title: "Predjela",
    image: appetizerImg,
    items: [
      {
        name: "Carpaccio od govedine",
        description: "Tanko sečena goveđa pršuta sa rukolom i parmezan cheese",
        price: "1,200 RSD"
      },
      {
        name: "Bruschetta Vizija",
        description: "Domaći hleb sa svežim paradajzom, bosiljkom i mozarelom",
        price: "800 RSD"
      },
      {
        name: "Tartar od lososa",
        description: "Svež losos sa avokadom i citrus dresingom",
        price: "1,500 RSD"
      },
      {
        name: "Plata sireva",
        description: "Selekcija domaćih i uvoznih sireva sa medom i orasima",
        price: "1,800 RSD"
      }
    ]
  },
  glavna: {
    title: "Glavna jela",
    image: mainCourseImg,
    items: [
      {
        name: "Biftek Vizija",
        description: "Premium goveđi biftek sa trufflovanim krompir pireom",
        price: "2,800 RSD"
      },
      {
        name: "Rižoto sa škampima",
        description: "Krem rižoto sa svežim škampima i belim vinom",
        price: "2,200 RSD"
      },
      {
        name: "Jagnjeći kotlet",
        description: "Kotlet janjeta sa mediteranskim povrćem",
        price: "2,600 RSD"
      },
      {
        name: "Losos na žaru",
        description: "Norveški losos sa sezonskim povrćem i lemon butter sosom",
        price: "2,400 RSD"
      },
      {
        name: "Vegetarijanski mussaka",
        description: "Tradicionalna mussaka sa svežim povrćem i bešamel sosom",
        price: "1,800 RSD"
      }
    ]
  },
  deserti: {
    title: "Deserti",
    image: dessertImg,
    items: [
      {
        name: "Tiramisu Vizija",
        description: "Naša interpretacija klasičnog tiramisu deserta",
        price: "650 RSD"
      },
      {
        name: "Čokoladni fondant",
        description: "Topli čokoladni kolač sa vanilla sladoledom",
        price: "750 RSD"
      },
      {
        name: "Panna cotta",
        description: "Kremasti desert sa šumskim bobičasitm voćem",
        price: "600 RSD"
      },
      {
        name: "Sezonsko voće",
        description: "Svež selekcija sezonskog voća sa medom",
        price: "550 RSD"
      }
    ]
  },
  pica: {
    title: "Pića",
    image: mainCourseImg,
    items: [
      {
        name: "Domaća vina",
        description: "Selekcija najboljih domaćih vina",
        price: "400-800 RSD"
      },
      {
        name: "Uvozna vina",
        description: "Premium vina iz Francuske, Italije i Španije",
        price: "1,200-3,000 RSD"
      },
      {
        name: "Craft piva",
        description: "Selekcija lokalnih craft piva",
        price: "350-500 RSD"
      },
      {
        name: "Kokteli",
        description: "Klasični i autorski kokteli",
        price: "800-1,200 RSD"
      },
      {
        name: "Bezalkoholna pića",
        description: "Svež sokovi, mineralna voda, kafa",
        price: "200-400 RSD"
      }
    ]
  }
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState('predjela');

  return (
    <section id="meni" className="section-padding bg-secondary/20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Naš <span className="gold-gradient">Meni</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Otkrijte našu pažljivo odabranu selekciju jela pripremljenih 
            od najkvalitetnijih sastojaka sa posebnom pažnjom na detalje.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-card">
            <TabsTrigger value="predjela" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Predjela
            </TabsTrigger>
            <TabsTrigger value="glavna" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Glavna jela
            </TabsTrigger>
            <TabsTrigger value="deserti" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Deserti
            </TabsTrigger>
            <TabsTrigger value="pica" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Pića
            </TabsTrigger>
          </TabsList>

          {Object.entries(menuData).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Category image */}
                <div className="lg:col-span-1">
                  <div className="elegant-card h-full min-h-[300px]">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Menu items */}
                <div className="lg:col-span-2 space-y-4">
                  {category.items.map((item, index) => (
                    <Card key={index} className="bg-card/50 border-border hover:bg-card transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-semibold text-foreground">
                            {item.name}
                          </h4>
                          <span className="text-primary font-bold text-lg ml-4">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Menu;