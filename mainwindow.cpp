#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QPixmap>
#include <QStandardPaths>
#include <QInputDialog>
#include <QFileDialog>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    trainworker = new TrainWorker(this);
    // background setting
    QPixmap bkgnd(":/images/jason-blackeye-lGPYNHy891E-unsplash.jpg");
    bkgnd = bkgnd.scaled(this->size(), Qt::IgnoreAspectRatio);
    QPalette bkg_palette;
    bkg_palette.setBrush(QPalette::Background, bkgnd);
    this->setPalette(bkg_palette);


    waitMessage = new QMessageBox(this);
    finishMessage = new QMessageBox(this);

    // text edit
    edit = ui->textEdit;
    edit->setEnabled(false);
    QStringList opening = QStringList() << "안녕하세요 HOJE입니다!" << "본 어플은 Tesseract OCR 학습기능을 담고 있습니다."
                                        << "Images : 한줄 이미지들을 학습시킵니다." << "\t 이미지 파일들과 gt.txt파일을 GT directory에 저장합니다."
                                       << "Single Image : 이미지 한장을 학습시킵니다." << "\t 이미지파일과 box 파일이 필요합니다."
                                      << "Fonts : 폰트를 학습시킵니다." << "\t 폰트를 /usr/share/fonts 에 저장합니다. 또한 language_specific.sh 파일을 수정합니다."
                                      << "KOR-ENG : 한글과 영어를 같이 학습시킵니다." << "\t 한글과 영어가 섞인 학습텍스트가 필요합니다."
                                      << "Transmit : 파일을 서버에 전송합니다." << "\t 서버와 전송에 필요한 버전을 확인 해야합니다."
                                      << "Version: 전송에 필요한 버전을 확인합니다.";
    for(auto str : opening)
        edit->append(str);


    // REST API
    connect(ui->transmit_button, &QPushButton::clicked, this, &MainWindow::trasmit_traineddata);
    connect(ui->version_button, &QPushButton::clicked, this, &MainWindow::check_version);


    // Connect button
    connect(ui->images_train, &QPushButton::clicked, [=] { what_train(trainworker, "train_images"); });
    connect(ui->singleImage_train, &QPushButton::clicked, [=] { what_train(trainworker, "train_singleImage"); });
    connect(ui->fonts_train, &QPushButton::clicked, [=] { what_train(trainworker, "train_fonts"); });
    connect(ui->multi_lang, &QPushButton::clicked, [=] { what_train(trainworker, "kor_eng"); });

    connect(ui->quit_button, &QPushButton::clicked, QApplication::instance(), &QApplication::quit);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::what_train(TrainWorker* trainworker,QString str)
{
    edit->clear();
    connect(trainworker, &TrainWorker::process_start, this, &MainWindow::start_message);
    connect(trainworker, &TrainWorker::process_finish, this, &MainWindow::finish_message);
    connect(trainworker, &TrainWorker::process_print, this, &MainWindow::print_message);
    trainworker->manager_func(str);
}
void MainWindow::start_message()
{
    waitMessage->setText("Running, Please wait until finish");
    waitMessage->setWindowFlags(Qt::FramelessWindowHint);
    waitMessage->show();
    QCoreApplication::processEvents();
}
void MainWindow::finish_message()
{
    finishMessage->setText("finish");
    finishMessage->setWindowFlags(Qt::FramelessWindowHint);
    finishMessage->exec();
}
void MainWindow::print_message()
{
    QString output = trainworker->print;
    qDebug() << output;
    edit->append(output);
    QApplication::processEvents();
}

void MainWindow::trasmit_traineddata()
{
    QString homeLocation = QStandardPaths::locate(QStandardPaths::HomeLocation, QString(), QStandardPaths::LocateDirectory);
    // trigger the request - see the examples in the following sections
    bool ok = true;
    QString url_str = QInputDialog::getText(this, tr("URL"),
                                                       tr("Input URL:"), QLineEdit::Normal,
                                                       "http://192.168.40.206:8080/uploadTrainedFile", &ok);
    if (!ok){return;}

    QString comment = QInputDialog::getText(this, tr("Comment"),
                                                       tr("Input Comment:"), QLineEdit::Normal,
                                                       "first transmit", &ok);
    if (!ok){return;}

    QString version = QInputDialog::getText(this, tr("Version"),
                                                       tr("Input Version:"), QLineEdit::Normal,
                                                       "0.1.0", &ok);
    if (!ok){return;}

    QString traineddata = QFileDialog::getOpenFileName(this,
                                                         tr("Input Traineddata"), homeLocation + "mytraining/tesseract/tessdata", tr("Traineddata (*.traineddata)"));
    if(traineddata.isEmpty() || traineddata.isNull()){return;}
    HttpRequestInput input(url_str, "POST");
    input.add_var("comment", comment);
    input.add_var("version", version);

    input.add_file("mediaFile", traineddata, nullptr, "application/octet-stream");

    HttpRequestWorker *worker = new HttpRequestWorker(this);
    connect(worker, SIGNAL(on_execution_finished(HttpRequestWorker*)), this, SLOT(handle_result(HttpRequestWorker*)));
    worker->execute(&input);
}

void MainWindow::check_version()
{
    bool ok = true;
    QString url_str = QInputDialog::getText(this, tr("URL"),
                                                       tr("Input URL:"), QLineEdit::Normal,
                                                        "http://192.168.40.206:8080/trainFileRecentVersionCheck", &ok);
    if (!ok){return;}
    HttpRequestInput input(url_str, "GET");

    HttpRequestWorker *worker = new HttpRequestWorker(this);
    connect(worker, SIGNAL(on_execution_finished(HttpRequestWorker*)), this, SLOT(handle_result(HttpRequestWorker*)));
    worker->execute(&input);
}

void MainWindow::handle_result(HttpRequestWorker *worker) {
    QString msg;

    if (worker->error_type == QNetworkReply::NoError) {
        // communication was successful
        msg = "Success - Response: " + worker->response;
    }
    else {
        // an error occurred
        msg = "Error: " + worker->error_str;
    }

    QMessageBox::information(this, "", msg);
}

