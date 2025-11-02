import React, { useEffect, useState } from "react";
import { getLearnResources } from "../services/api";
import { BookOpen, Sparkles } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const LearnPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchLearn = async () => {
      try {
        const res = await getLearnResources();
        if (res.success && res.data.length > 0) {
          setArticles(res.data);
        } else {
          // fallback demo data
          setArticles([
            {
              title: "Healthy Eating Habits for Youth",
              description:
                "Learn how balanced meals, hydration, and mindful eating reduce diabetes risk for young adults.",
              category: "Nutrition",
              link: "https://www.healthline.com/nutrition/healthy-eating-for-beginners",
              image:
                "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=600&q=80",
            },
            {
              title: "Managing Stress Effectively",
              description:
                "Discover the power of mindfulness and digital detox to manage stress in modern youth.",
              category: "Mental Health",
              link: "https://www.verywellmind.com/tips-to-reduce-stress-3145195",
              image:
                "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
            },
            {
              title: "Exercise for Blood Sugar Control",
              description:
                "Regular exercise keeps blood sugar in check and boosts insulin sensitivity.",
              category: "Fitness",
              link: "https://www.diabetes.org/fitness",
              image:
                "https://images.unsplash.com/photo-1594737625785-c8973cde2b9b?auto=format&fit=crop&w=600&q=80",
            },
            {
              title: "Understanding Type 2 Diabetes",
              description:
                "A simplified explanation of diabetes, risk factors, and prevention techniques for youth.",
              category: "Education",
              link: "https://www.cdc.gov/diabetes/basics/type2.html",
              image:
                "https://images.unsplash.com/photo-1600456899121-25b1d9e3e6b1?auto=format&fit=crop&w=600&q=80",
            },
            {
              title: "Sleep and Recovery Benefits",
              description:
                "Learn how quality sleep supports hormonal balance, stress reduction, and insulin function.",
              category: "Wellness",
              link: "https://www.sleepfoundation.org/teens-and-sleep",
              image:
                "https://images.unsplash.com/photo-1517519014922-8fc06d7cbf27?auto=format&fit=crop&w=600&q=80",
            },
          ]);
        }
      } catch (err) {
        console.error("Learn fetch failed:", err);
      }
    };
    fetchLearn();
  }, []);

  return (
    <>
      {/* Add top padding so content appears below navbar */}
      <div className="container py-5 mt-1" >
        {/* Header Section */}
        <div className="text-center mb-2">
          <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
            <BookOpen size={30} className="text-primary" />
            <Sparkles size={20} className="text-warning" />
          </div>
          <h2 className="fw-bold text-primary mb-2">
            Learn — Youth Health & Diabetes Awareness
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
            Explore AI-curated educational resources for youth on health
          </p>
        </div>

        {/* Cards Grid */}
        <div className="row g-4 justify-content-center">
          {articles.map((item, idx) => (
            <div
              key={idx}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"
            >
              <div className="card shadow-sm border-0 flex-fill rounded-3 overflow-hidden">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <span className="badge bg-light text-primary mb-2">
                      {item.category}
                    </span>
                    <h5 className="card-title fw-semibold text-dark">
                      {item.title}
                    </h5>
                    <p className="card-text text-muted small mt-2">
                      {item.description}
                    </p>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary mt-3 w-100"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}

          {articles.length === 0 && (
            <div className="text-center text-secondary mt-5">
              No learning resources available at the moment.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LearnPage;
