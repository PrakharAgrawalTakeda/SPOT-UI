import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OldUrlRedirectResolver implements Resolve<void> {

  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): void {
    const problemId = route.queryParamMap.get('ProblemID');
    const problemTitle = route.queryParamMap.get('ProblemTitle');

    if (problemId) {
      // Redirecting to the new Angular route format
      console.log(problemId)
      this.router.navigate(['project-hub', problemId]);
    } else {
      // Handle the case where ProblemID is not present in the old URL.
      this.router.navigate(['']);
    }
  }
}
