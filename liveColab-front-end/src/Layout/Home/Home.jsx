
import '../../HomePage.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login'); // Navigate to the signup page
    };

   

    const handleVisualizationsClick = () => { 
        navigate('./visualization');// Navigate to the visualization page
    };

    const handleDataIntegrationClick = () => {
        navigate('./integration'); // Navigate to the data integration page
    };
    const handleCollaborationClick = () => {
         navigate('./collab'); // Navigate to the data integration page
    };
    const handleExplorationClick = () => {
        navigate('./interaction'); // Navigate to the data integration page
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>LiveCoLab</h1>
                <p>Real-Time Collaborative Data Visualization</p>
            </header>

            <section className="features-section">
                <div className="feature-card clickable" onClick={handleCollaborationClick}> {/* Make it clickable */}
                    <h2>Real-Time Collaboration</h2>
                    <p>Work together on data visualizations in real time. See changes live as your collaborators make them.</p>
                </div>
                <div className="feature-card clickable" onClick={handleVisualizationsClick}> {/* Make it clickable */}
                    <h2>Diverse Visualizations</h2>
                    <p>Choose from a variety of charts and graphs: bar charts, line graphs, scatter plots, heatmaps, and more.</p>
                </div>
                <div className="feature-card clickable" onClick={handleDataIntegrationClick}> {/* New clickable card */}
                    <h2>Data Integration</h2>
                    <p>Import your own data (CSV, JSON, Excel) or connect to external APIs for live data feeds.</p>
                </div>
                <div className="feature-card clickable" onClick={handleExplorationClick}>
                    <h2>Interactive Exploration</h2>
                    <p>Zoom, pan, filter, and annotate your data to uncover deeper insights. Collaborate with comments and notes directly on the charts.</p>
                </div>
            </section>

            <section className="cta-section">
                <h2>Start Visualizing Today</h2>
                <p>Empower your team with real-time data collaboration.</p>
                <button className="get-started-button" onClick={handleGetStarted}>Get Started</button>
            </section>

            <footer className="home-footer">
                <p>&copy; {new Date().getFullYear()} LiveCoLab. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;