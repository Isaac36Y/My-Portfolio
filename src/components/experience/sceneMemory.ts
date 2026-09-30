import { scenes, type SceneId } from "./scenes";

// Module scope outlives the Stage across client-side route changes but not a reload, so coming back
// from a page like /my-work resumes on the scene the visitor left from while a fresh visit starts at the hero.
let sceneToResumeId: SceneId = scenes[0].id;

export function rememberScene(sceneId: SceneId) {
    sceneToResumeId = sceneId;
}

export function sceneToResume(): SceneId {
    return sceneToResumeId;
}
