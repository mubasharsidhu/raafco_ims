FROM php:8.3-fpm


RUN apt-get update && apt-get install -y \
    bash \
    ca-certificates \
    curl \
    gnupg \
    libpq-dev \
    libzip-dev \
    openjdk-21-jre-headless \
    openssh-client \
    pipx \
    procps \
    sudo \
    zip \
    zlib1g-dev \
    \
&& docker-php-ext-install \
    pdo \
    pdo_pgsql \
    bcmath \
    opcache \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*


ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-arm64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

COPY config/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && rm -rf /tmp/pear \
    && useradd -ms /bin/bash vscode \
    && echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers \
    && mkdir -p /home/www-data \
    && chown -R www-data:www-data /home/www-data \
    && usermod -d /home/www-data www-data \
    && chsh -s /bin/bash www-data \
    && mkdir -p /var/www/html/vendor /var/www/html/node_modules \
    && chown -R vscode:vscode /var/www/html

COPY config/php/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

USER vscode

RUN pipx install pre-commit==4.3.0 \
    && rm -rf /home/vscode/.cache/pipx

WORKDIR /var/www/html
