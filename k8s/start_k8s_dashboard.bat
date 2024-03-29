@echo off

rem Apply the Kubernetes dashboard recommended deployment
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml

rem Patch the deployment to enable skip login
kubectl patch deployment kubernetes-dashboard -n kubernetes-dashboard --type json -p "[{\"op\": \"add\", \"path\": \"/spec/template/spec/containers/0/args/-\", \"value\": \"--enable-skip-login\"}]"

rem Delete existing clusterrolebinding for serviceaccount-cluster-admin
kubectl delete clusterrolebinding serviceaccount-cluster-admin

rem Create a new clusterrolebinding for serviceaccount-cluster-admin
kubectl create clusterrolebinding serviceaccount-cluster-admin --clusterrole=cluster-admin --user=system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard

rem Start kubectl proxy
start /B kubectl proxy

rem Open the dashboard in a web browser
echo Opening Kubernetes dashboard...
timeout /t 3 >nul 2>&1
start chrome http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
