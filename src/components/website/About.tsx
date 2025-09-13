import { Card, CardContent } from "@/components/ui/card";
import aboutImage from "@/assets/about-ironwork.jpg";
import { useTranslation } from "@/contexts/TranslationContext";

interface Website {
  about_title?: string;
  about_content?: string;
}

export const About = ({ website }: { website?: Website }) => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {website?.about_title || t("about.title", "About Our Ironwork Mastery")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {website?.about_content || t("about.description", "With decades of experience in traditional and modern ironwork, we craft pieces that blend artistry with functionality. Our skilled artisans bring passion and precision to every project.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">{t("about.stats.projects", "Projects Completed")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9</div>
              <div className="text-gray-600">{t("about.stats.rating", "Rating")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-gray-600">{t("about.stats.experience", "Years Experience")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">{t("about.stats.satisfaction", "Satisfaction")}</div>
            </div>
          </div>

          <div className="relative">
            <img
              src={aboutImage}
              alt="Skilled ironworkers crafting metalwork"
              className="rounded-lg shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">{t("about.mission.title", "Our Mission")}</h3>
              <p className="text-gray-600">
                {t("about.mission.description", "To create exceptional ironwork that enhances spaces and exceeds expectations through innovative design and superior craftsmanship.")}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">{t("about.vision.title", "Our Vision")}</h3>
              <p className="text-gray-600">
                {t("about.vision.description", "To be the premier ironwork specialists, known for transforming metal into masterpieces that stand the test of time.")}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">{t("about.values.title", "Our Values")}</h3>
              <p className="text-gray-600">
                {t("about.values.description", "Quality, integrity, and customer satisfaction drive everything we do. We believe in honest communication and delivering on our promises.")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};