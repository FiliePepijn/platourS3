import Swup from 'swup';
import SwupScriptsPlugin from '@swup/scripts-plugin';



const swup = new Swup({
    containers: ['#swup'], 
    plugins: [
        new SwupScriptsPlugin({
            head: true,
            body: true,
        }),
    ],
});

