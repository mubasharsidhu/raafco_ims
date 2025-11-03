<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($this->app->environment('testing')) {
            Vite::macro('useManifest', fn () => collect());
            Vite::macro('script', fn () => '');
            Vite::macro('asset', fn () => '');
            Vite::macro('preload', fn () => '');
            Vite::macro('hotFile', fn () => false);
        }

        Vite::prefetch(concurrency: 3);
    }
}
