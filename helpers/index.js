import React from 'react';
// import ReactDOM from 'react-dom';

const page = (
    <div className="App">
        <header class="header">   
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid d-flex align-items-center justify-content-between">
                <div class="navbar-header">
                    {/* <!-- Navbar Header--> */}
                    <a href="index.html" class="navbar-brand">
                    <div class="brand-text brand-big visible text-uppercase"><strong class="text-primary">PH</strong><strong>Covid19</strong><strong class="text-primary">Tracker</strong></div>
                    <div class="brand-text brand-sm"><strong class="text-primary">PH</strong><strong>C</strong><strong class="text-primary">T</strong></div></a>
                    {/* <!-- Sidebar Toggle Btn--> */}
                    <button class="sidebar-toggle"><i class="fa fa-long-arrow-left"></i></button>
                </div>
                </div>
            </nav>
            </header>
            <div class="d-flex align-items-stretch">
            {/* <!-- Sidebar Navigation--> */}
            <nav id="sidebar">
                {/* <!-- Sidebar Navidation Menus--> */}
                <ul class="list-unstyled">
                <li class="active"><a href="index.html"> <i class="icon-home"></i>Home </a></li>
                <li><a href="tables.html"> <i class="icon-grid"></i>Tables </a></li>
                <li><a href="charts.html"> <i class="fa fa-bar-chart"></i>Charts </a></li>
                <li><a href="forms.html"> <i class="icon-padnote"></i>Forms </a></li>
                <li> <a href="#"> <i class="icon-settings"></i>About Us </a></li>
                </ul>
            </nav>
            <div class="page-content">
            <section>
                <div class="page-header">
                    <div class="container-fluid text-center">
                        <h2 class="h5 no-margin-bottom text-primary">PH Covid-19 Information as of April 18, 2020 12:00:00 GMT+8</h2>
                    </div>
                    </div>

            </section>
                <section class="no-padding-top no-padding-bottom">
                <div class="container-fluid">
                    <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <div class="statistic-block block">
                        <div class="progress-details d-flex align-items-end justify-content-between">
                            <div class="title">
                            <div class="icon"><i class="icon-line-chart"></i></div><strong>CASES</strong>
                            </div>
                            <div class="number dashtext-2">375</div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="statistic-block block">
                        <div class="progress-details d-flex align-items-end justify-content-between">
                            <div class="title">
                            <div class="icon"><i class="icon-paper-and-pencil"></i></div><strong>DEATHS</strong>
                            </div>
                            <div class="number dashtext-3">140</div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="statistic-block block">
                        <div class="progress-details d-flex align-items-end justify-content-between">
                            <div class="title">
                            <div class="icon"><i class="icon-page"></i></div><strong>RECOVERIES</strong>
                            </div>
                            <div class="number dashtext-4">41</div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                <section class="no-padding-bottom">
                <div class="container-fluid">
                    <div class="row">
                    <div class="col-lg-12">
                        <div class="line-cahrt block">
                        <canvas id="lineCahrt"></canvas>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                <footer class="footer">
                <div class="footer__block block no-margin-bottom">
                    <div class="container-fluid text-center">
                    {/* <!-- Please do not remove the backlink to us unless you support us at https://bootstrapious.com/donate. It is part of the license conditions. Thank you for understanding :)--> */}
                    <p class="no-margin-bottom">2020 &copy; Your company. Design by <a href="https://bootstrapious.com/p/bootstrap-4-dark-admin">Bootstrapious</a>.</p>
                    </div>
                </div>
                </footer>
            </div>
            </div>
            {/* <!-- JavaScript files--> */}
            <script src="vendor/jquery/jquery.min.js"></script>
            <script src="vendor/popper.js/umd/popper.min.js"> </script>
            <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
            <script src="vendor/jquery.cookie/jquery.cookie.js"> </script>
            <script src="vendor/chart.js/Chart.min.js"></script>
            <script src="vendor/jquery-validation/jquery.validate.min.js"></script>
            <script src="js/charts-home.js"></script>
            <script src="js/front.js"></script>
    </div>
);

function App() {
    return page;
}

export default App;

// ReactDOM.render(App, document.getElementById('root'));
